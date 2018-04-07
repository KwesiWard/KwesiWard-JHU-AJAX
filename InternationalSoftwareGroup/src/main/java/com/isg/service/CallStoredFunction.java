package com.isg.service;

import com.isg.dao.ConnectionPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.sql.CallableStatement;

public class CallStoredFunction {
	
	private ConnectionPool connectionPool;
	private Connection connection;
	private CallableStatement cs;
	
	public CallStoredFunction() {
		connectionPool = null;
		connection = null;
		cs = null;
	}
	
	public String authenticateUser(String username, String password) {
		
		String reply = "";
		try {
			connectionPool = new ConnectionPool();
			connection = connectionPool.openConnection();
			String sql = "{? = call authenticateUser(?, ?)}";
			cs = connection.prepareCall(sql);
			cs.registerOutParameter (1, Types.VARCHAR);
			cs.setString(2,username);       
		    cs.setString(3,password);
			cs.executeUpdate();
			reply = cs.getString(1);
		}
		catch(SQLException sqle) {
			sqle.printStackTrace();
		}
		finally {
			connectionPool.closeCallableStatement(cs);
			connectionPool.closeConnection(connection);
		}
		
		return reply;
	}
}
