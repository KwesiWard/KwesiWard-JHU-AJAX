package com.isg.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelpServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    public HelpServlet() {
        super();
    }
    
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	ServletConfig config = this.getServletConfig();
    	String file_name = config.getInitParameter("help_file");
    	
    	response.setContentType("application/pdf");
    	response.setHeader("Content-Disposition", "inline; filename=output.pdf");
    	
    	ClassLoader classLoader = getClass().getClassLoader();
    	File file = new File(classLoader.getResource(file_name).getFile());
    	
    	OutputStream out = response.getOutputStream(); 
    	try (FileInputStream in = new FileInputStream(file)) {
    		
    	    int content;
    	    while ((content = in.read()) != -1) {
    	        out.write(content);
    	    }
    	} 
    	catch (IOException e) {
    	    e.printStackTrace();
    	}
    	out.close();
	}
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}
}
