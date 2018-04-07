package com.isg.dao;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.SQLException;
import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.Context;

public class ConnectionPool {
	
	private DataSource dataSource = null;
	
	public ConnectionPool() {
		
		try {
			Context initContext = new InitialContext();
			Context envContext = (Context) initContext.lookup("java:comp/env");
			dataSource = (DataSource) envContext.lookup("jdbc/isg");
		} 
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public Connection openConnection() {
		
		Connection connection = null;
		
		try {
			connection = dataSource.getConnection();
		} 
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return connection;
	}
	
	public void closeConnection(Connection connection) {
		
		try {
			if(connection != null) {
				connection.close();
			}
		}
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
	}
	
	public void closeCallableStatement(CallableStatement cs) {
		
		try {
			if(cs != null) {
				cs.close();
			}
		}
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
	}
}
