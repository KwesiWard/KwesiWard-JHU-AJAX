package com.isg.servlet;

import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.isg.dao.ConnectionPool;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
import com.isg.service.CallStoredProcedure;
import com.isg.service.CallStoredFunction;
import com.isg.service.User;
import java.util.ArrayList;
import java.util.List;
 
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url = "";
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		CallStoredProcedure call = new CallStoredProcedure();
		String reply = call.validateUser(username, password);
		
		if(reply.equals("true")) {
			
			User user1 = new User();
			user1.setStatus(0);
			user1.setFirstName("Mary");
			user1.setLastName("Lou");
			
			User user2 = new User();
			user2.setStatus(1);
			user2.setFirstName("John");
			user2.setLastName("Doe");
			
			List<User> users = new ArrayList<User>();
			users.add(user1);
			users.add(user2);
			
			HttpSession session = request.getSession();
			session.setAttribute("users", users);
			
			url = "/view/user/user_success.jsp";
			log("Login Success...");
		}
		else {
			url = "/view/user/user_failure.jsp";
			log("Login Failure...");
		}
		
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
		dispatcher.forward(request, response);
		
		/*
		ConnectionPool connectionPool = new ConnectionPool();
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		String query = "INSERT INTO userpass (Username, Password) VALUES (?, ?)";
		
		try {
			connection = connectionPool.openConnection();
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, username);
			preparedStatement.setString(2, password);
			preparedStatement.executeUpdate();
			CallStoredProcedure call = new CallStoredProcedure();
			call.getUserRoles();
			
			String url = "/view/user/user_success.jsp";
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
			dispatcher.forward(request, response);
 		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			connectionPool.closeConnection(connection);
			
			try {
				if(preparedStatement != null) {
					preparedStatement.close();
				}
			}
			catch(SQLException sqle) {
				sqle.printStackTrace();
			}
		}
		*/
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		service(request, response);
	}
}
