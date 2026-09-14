import streamlit as st
import os
import dotenv
from dotenv import load_dotenv
import langchain
from langchain_google_genai import ChatGoogleGenerativeAI

import zipfile


st.set_page_config(page_title="AI website Generator",page_icon="🤖")
st.title("AI Website Generator")

inp = st.text_area("Tell me which website you want to create..")

load_dotenv()

os.environ["GEMINI_API_KEY"] = os.getenv("key")

if st.button("generate website"):

    model = ChatGoogleGenerativeAI(model="gemini-3.5-flash",temperature=0.7)

    with st.spinner("generating..."):

        prompt = [ ("system",""" you are having a 10 plus years of experience in web development mainly front end.
                                generate html,css,java script code for a full front end website based on the user prompt.

                                return output exactly in the below format:

                                --html--
                                [html code]
                                --html--

                                --css--
                                [css code]
                                --css--

                                --js--
                                [javascrpit code]
                                --js--
                                
                                """)]
        prompt.append(("user",inp),)

        response = model.invoke(prompt).content

        if isinstance(response, list):
            response = "".join(
                block["text"]
                for block in response
                if isinstance(block, dict) and block.get("type") == "text"
            )
        else:
            response = response

        html = response.split("--html--")[1].strip()
        css = response.split("--css--")[1].strip()
        js = response.split("--js--")[1].strip()

        # Connect CSS to HTML
        html = html.replace(
            "</head>",
            '<link rel="stylesheet" href="style.css">\n</head>'
        )

        # Connect JavaScript to HTML
        html = html.replace(
            "</body>",
            '<script src="java.js"></script>\n</body>'
        )


        with open("ht.html", "w", encoding="utf-8") as file:
            file.write(html)

        with open("style.css", "w", encoding="utf-8") as file:
            file.write(css)

        with open("java.js", "w", encoding="utf-8") as file:
            file.write(js)

        with zipfile.ZipFile("website.zip","w") as f:
            f.write("ht.html")
            f.write("style.css")
            f.write("java.js")

        st.download_button("download zip",data=open("website.zip","rb"),file_name="website.zip")

        st.write("success")

        

    