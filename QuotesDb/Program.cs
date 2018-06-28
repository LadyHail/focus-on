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
            // Initialize variables
            string dir = Environment.CurrentDirectory;
            Directory.CreateDirectory(dir + "/data");
            string jsonPath = dir + "/data/" + "quotes.json";
            List<Quote> quotes = new List<Quote>();
            int id = 0;

            // Download data from web. Then save it as HTML.
            WebClient webClient = new WebClient();
            for (int i = 1; i < 12; i++)
            {
                webClient.DownloadFile(
                    "https://www.successories.com/iquote/category/50/motivational-quotes/" + i,
                    dir + "/data/" + i + ".html"
                    );
            }

            // Make operations on every saved file.
            for (int i = 1; i < 12; i++)
            {
                string path = dir + "/data/" + i + ".html";
                HtmlDocument doc = new HtmlDocument();
                doc.Load(path);

                // Get all divs elements in the file.
                HtmlNodeCollection allDivs = doc.DocumentNode.SelectNodes("//div");
                List<HtmlNode> nodesList = new List<HtmlNode>();

                // Search for divs with class "quotebox". Then save them to the list.
                foreach (HtmlNode item in allDivs)
                {
                    if (item.HasClass("quotebox"))
                    {
                        nodesList.Add(item);
                    }
                }

                // For each div in the list search for elements with class "quote" and "aboutquote". Then get important data and save them to the list.
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

            // Save quotes to JSON file.
            using (StreamWriter file = File.AppendText(jsonPath))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, quotes);
            }
        }
    }
}
