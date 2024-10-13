package policonsultorio.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {
	private Long id ;
	private String name;
	private String password;
	private String email;
	private String phone;
	private String img;
	private Boolean active = true;

}
