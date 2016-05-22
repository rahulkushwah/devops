<%@ page import="java.sql.*"%>
<%
    String userName = request.getParameter("uname");    
    String password = request.getParameter("password");
    Class.forName("oracle.jdbc.driver.OracleDriver");
    Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE",
            "jeeappdb", "password");
    Statement st = con.createStatement();
    ResultSet rs;
    rs = st.executeQuery("select * from LOGIN_DETAILS where userName='" + userName + "' and password='" +password + "'");
    if (rs.next()) {
        session.setAttribute("userid", userName);
        response.sendRedirect("success.jsp");
    } else {
        out.println("Invalid password <a href='index.jsp'>try again</a>");
    }
%>