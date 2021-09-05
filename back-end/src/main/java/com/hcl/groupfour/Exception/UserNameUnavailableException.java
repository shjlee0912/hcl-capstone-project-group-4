package com.hcl.groupfour.Exception;

public class UserNameUnavailableException extends Exception {
	
	public UserNameUnavailableException() {
		super("The submitted username is unavailable");
	}

}
