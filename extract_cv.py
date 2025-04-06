import PyPDF2
import os

def extract_text_from_pdf(pdf_path, output_file):
    """Extract text from PDF and save to a text file"""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        
        # Extract text from each page
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
            
        # Write extracted text to file
        with open(output_file, 'w', encoding='utf-8') as output:
            output.write(text)
            
        print(f"Text extracted from {pdf_path} and saved to {output_file}")
        return text

if __name__ == "__main__":
    pdf_path = "/home/ubuntu/upload/Doaa_Elakkad_Resume.pdf"
    output_file = "/home/ubuntu/cv_project/extracted_cv.txt"
    
    extract_text_from_pdf(pdf_path, output_file)
