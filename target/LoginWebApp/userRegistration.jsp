<%@ page import="java.sql.*"%>
<%
    String userName = request.getParameter("userName");    
    String password = request.getParameter("password");
    String firstName = request.getParameter("firstName");
    String lastName = request.getParameter("lastName");
    String email = request.getParameter("email");
    Class.forName("oracle.jdbc.driver.OracleDriver");
    Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE",
            "jeeappdb", "password");
    Statement st = con.createStatement();
    int i = st.executeUpdate("insert into LOGIN_DETAILS(first_name, last_name, email, username, password, regdate) values ('" + firstName + "','" 
    + lastName + "','" + email + "','" + userName + "','" + password + "', sysdate)");
    if (i > 0) {
        response.sendRedirect("welcome.jsp");
       
    } else {
        response.sendRedirect("index.jsp");
    }
%>