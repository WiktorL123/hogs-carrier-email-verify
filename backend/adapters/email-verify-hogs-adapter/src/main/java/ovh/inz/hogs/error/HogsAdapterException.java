package ovh.inz.hogs.error;

import lombok.Getter;

@Getter
public class HogsAdapterException extends RuntimeException {
  private final int statusCode;

  private String responseBody;

  public HogsAdapterException(String message) {
    super(message);
    this.statusCode=-1;
    this.responseBody=null;
  }
  public HogsAdapterException(String message, int statusCode, String responseBody){
    super("External service error with statusCode" + statusCode + " and message" + message);
    this.statusCode=statusCode;
    this.responseBody=responseBody;
  }
}
