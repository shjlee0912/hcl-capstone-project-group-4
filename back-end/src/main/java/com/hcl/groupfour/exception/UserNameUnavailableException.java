package com.hcl.groupfour.exception;

public class UserNameUnavailableException extends Exception {
	
	public UserNameUnavailableException() {
		super("The submitted username is unavailable");
	}

}
