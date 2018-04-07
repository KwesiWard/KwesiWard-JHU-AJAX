package com.isg.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Scanner;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;


public class FileUploadServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if(ServletFileUpload.isMultipartContent(request)){
         
			try {
                List<FileItem> multiparts = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

                for(FileItem item : multiparts){
                	
                	if(!item.isFormField()) {
                		
                		InputStream is = null;
                		InputStreamReader r = null;
                		BufferedReader br = null;
                		
                		try {
                			is = item.getInputStream();
                			r = new InputStreamReader(is);
                			br = new BufferedReader(r);
                			String line = "";
                			StringBuffer buffer = new StringBuffer();
                			
                			while((line = br.readLine()) != null) {
                				buffer.append(line);
                				buffer.append("\n");
                			}
                			
                			System.out.print(buffer.toString());
                			
                		}
                		catch(IOException ex) {
                			System.out.println(ex.toString());
                		}
                		finally {
                			
                            if(br != null) {
                            	br.close();
                        	}
                            
                            if(r != null) {
                            	r.close();
                        	}
                            
                            if(is != null) {
                            	is.close();
                        	}
                        }
                	}//if
                	
                	if(item.isFormField()) {
                		
                		String name = item.getFieldName();
                	    String value = item.getString();
                	    System.out.println(name + ": " + value);
                	}  
                }

               request.setAttribute("message", "File Uploaded Successfully");
               log("File Upload Success...");
            } 
			catch (Exception ex) {

               request.setAttribute("message", "File Upload Failed due to " + ex);
               log("File Upload Failure...", ex);
            }     
		}
		else{
		
			request.setAttribute("message", "Sorry this Servlet only handles file upload request");
			log("Can only handle file upload request...");
		}
		
		String url = "/view/user/message.jsp";
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
		dispatcher.forward(request, response);
	}	
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}	

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}
	
	private void testCode() {
		/*
        if(!item.isFormField()){

            String fileName = new File(item.getName()).getName();
            System.out.println("File Name: " + fileName);
            ServletContext context = getServletContext();
            String path = context.getRealPath("/" + fileName);
            File file = new File(path);
            System.out.println("File Path: " + path);
            
            item.write(file);
            Scanner input = null;
            
            try
            {
          	  input = new Scanner(file);
          	  while(input.hasNext())
                {
          		 String line = input.nextLine(); 
                   System.out.println(line);
                }
            }
            catch(IOException ioex) {
            	System.out.println(ioex.toString());
            }
            finally {
               if(input != null) {
                  input.close();
           	   }	  
            }  
        }
        */
	}
}
