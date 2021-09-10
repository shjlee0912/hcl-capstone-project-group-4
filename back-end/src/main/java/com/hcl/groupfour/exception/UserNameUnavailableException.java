package com.hcl.groupfour.exception;

public class UserNameUnavailableException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNameUnavailableException() {
		super("The submitted username is unavailable");
	}

}
