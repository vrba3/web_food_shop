package beans;

import java.util.ArrayList;
import java.util.Date;

import enumerations.UserRoles;

public class Customer extends User {
	private ArrayList<Order> allOrders;
	private Cart cart;
	private int collectedPoints;
	private CustomerType customerType;
	
	public Customer() {
		super();
	}
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			UserRoles userRole) {
		super(username, password, name, lastName, sex, birthDate, userRole);
	}
	
	public Customer(String username, String password, String name, String lastName, String sex, Date birthDate,
			UserRoles userRole, ArrayList<Order> allOrders, Cart cart, int collectedPoints, CustomerType customerType) {
		super(username, password, name, lastName, sex, birthDate, userRole);
		this.allOrders = allOrders;
		this.cart = cart;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
	}
	
	public ArrayList<Order> getAllOrders() {
		return allOrders;
	}
	public void setAllOrders(ArrayList<Order> allOrders) {
		this.allOrders = allOrders;
	}
	public Cart getCart() {
		return cart;
	}
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	public int getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
}