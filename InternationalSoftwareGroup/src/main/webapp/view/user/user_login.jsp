<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html">
<html>
<head>
	<title>User Login Page</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<%
		ServletContext sc = getServletContext();
		String path = sc.getContextPath();
	%>
	<link rel="stylesheet" href="<%=path%>/css/style.css" type="text/css"/>
</head>
<body>
    <div class="container">
    
		<h3>User Login Page</h3>
	
		<form action="LoginServlet" method="POST">
			
			<div class="form-group">
      			<label for="username">Username:</label>
      			<input type="text" class="form-control" name="username" placeholder="Enter Username"/>
    		</div>
    		
		    <div class="form-group">
		      <label for="password">Password:</label>
		      <input type="password" class="form-control" name="password" placeholder="Enter Password"/>
		    </div>
		    
		    <div class="centered text-center">
				<button type="submit" class="btn btn-default">Submit</button>
			</div>
		
		</form>
	</div>
</body>
</html>