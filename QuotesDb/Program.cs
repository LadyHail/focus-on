using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace QuotesDb
{
    public class Quote
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }

        public Quote(int id, string text, string author)
        {
            Id = id;
            Author = author;
            Text = text;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            string dir = Environment.CurrentDirectory;
            Directory.CreateDirectory(dir + "/data");
            string jsonPath = dir + "/data/" + "quotes.json";
            List<Quote> quotes = new List<Quote>();
            int id = 0;

            WebClient webClient = new WebClient();
            for (int i = 1; i < 12; i++)
            {
                webClient.DownloadFile(
                    "https://www.successories.com/iquote/category/50/motivational-quotes/" + i,
                    dir + "/data/" + i + ".html"
                    );
            }

            for (int i = 1; i < 12; i++)
            {
                string path = dir + "/data/" + i + ".html";
                HtmlDocument doc = new HtmlDocument();
                doc.Load(path);

                HtmlNodeCollection allDivs = doc.DocumentNode.SelectNodes("//div");
                List<HtmlNode> nodesList = new List<HtmlNode>();

                foreach (HtmlNode item in allDivs)
                {
                    if (item.HasClass("quotebox"))
                    {
                        nodesList.Add(item);
                    }
                }

                foreach (HtmlNode item in nodesList)
                {
                    HtmlNodeCollection childNodes = item.ChildNodes;
                    string text = "", author = "";
                    foreach (HtmlNode node in childNodes)
                    {
                        if (node.HasClass("quote"))
                        {
                            text = node.InnerText.Replace('"', ' ').Trim();
                        }

                        if ((node.HasClass("aboutquote")))
                        {
                            string inner = node.ChildNodes.FindFirst("span").InnerHtml;
                            author = inner.Split('/')[6];
                            var name = author.Split('-');
                            author = name[0] + " " + name[1];
                            Quote quote = new Quote(id, text, author);
                            quotes.Add(quote);
                            id++;
                        }
                    }
                }
            }

            using (StreamWriter file = File.AppendText(jsonPath))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, quotes);
            }
        }
    }
}
