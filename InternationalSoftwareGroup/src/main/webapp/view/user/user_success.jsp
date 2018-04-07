<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>User Success Page</title>
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
		
		<h3>User Success Page</h3>
		
		<form action="FileUploadServlet" method="POST" enctype="multipart/form-data">
		    
		    <!-- 
		    Select Files: <input type="file" name="file" multiple/><br>
		    <input type="submit" value="upload"/>
		    -->
		    
		    <div class="form-group">
      			<label for="projectName">Project Name:</label>
      			<input type="text" class="form-control" name="projectName" placeholder="Enter Project Name"/>
    		</div>
		    
		    <div class="form-group">
      			<label for="file">Select file:</label>
      			<input type="file" class="form-control" name="file"/>
    		</div>
		    
		    <div class="centered text-center">
				<button type="submit" class="btn btn-default">Upload</button>
			</div>
		</form>
		
		<table class="table table-striped">
		    <thead>
		      <tr>
		      	<th>Status</th>
		        <th>First Name</th>
		        <th>Last Name</th>
		      </tr>
		    </thead>
		    <tbody>
		      <c:forEach var="item" items="${users}">
		      
		        <c:choose>
		        	<c:when test="${item.status==1}">
      					<c:set var="status" value="Active" />
   					</c:when>
		        	<c:otherwise>
		        		<c:set var="status" value="Inactive"/> 
		        	</c:otherwise>
		        </c:choose>
		        
              	<tr>
			        <td>${status}</td>
			        <td>${item.firstName}</td>
			        <td>${item.lastName}</td>
		      	</tr>			
              </c:forEach>	
		    </tbody>
	  </table>
		
		<a href="view/admin/admin_login.jsp">Admin Page</a> <br>
		<a href="HelpServlet" target="_blank">Help Doc</a> <br>
		
	</div>	
</body>
</html>