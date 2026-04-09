package ovh.inz.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.naming.NamingEnumeration;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmailDto {
       @NotBlank(message = "Email cannot be empty")
       @Email(message = "Email is not valid")
       @Size( max = 254, message = "Cannot be longer than 254 characters")
       private  String email;
}
