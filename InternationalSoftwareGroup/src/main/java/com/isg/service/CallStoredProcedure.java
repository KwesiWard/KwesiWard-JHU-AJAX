package com.isg.service;

import com.isg.dao.ConnectionPool;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.sql.CallableStatement;

public class CallStoredProcedure {
	
	private ConnectionPool connectionPool;
	private Connection connection;
	private ResultSet rs;
	private CallableStatement cs;
	
	public CallStoredProcedure() {
		connectionPool = null;
		connection = null;
		rs = null;
		cs = null;
	}
	
	public void getUserRoles() {
		
		try {
			connectionPool = new ConnectionPool();
			connection = connectionPool.openConnection();
			String sql = "{call getUserRoles()}";
			cs = connection.prepareCall(sql);
			cs.executeUpdate();
			rs = cs.executeQuery();
			
			while(rs.next()) {
				System.out.println("Username: " + rs.getString(1));
				System.out.println("Rolenmae: " + rs.getString(2));
			}
		}
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
		finally {
			connectionPool.closeConnection(connection);
		}
	}
	
	public String validateUser(String username, String password) {
		
		String result = "";
		try {
			connectionPool = new ConnectionPool();
			connection = connectionPool.openConnection();
			String sql = "{call validateUser(?, ?, ?)}";
			cs = connection.prepareCall(sql);
			cs.setString(1,username);       
		    cs.setString(2,password);
		    cs.registerOutParameter (3, Types.VARCHAR);
			cs.executeUpdate();
			result = cs.getString(3);
		}
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
		finally {
			connectionPool.closeCallableStatement(cs); 
			connectionPool.closeConnection(connection);
		}
		
		return result;
	}

}
