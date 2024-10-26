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
	private String dni;
	private String obraSocial;
	private String numeroAsociado;
	private String password;
	private String email;
	private String phone;
	private String img;
	private Boolean active = true;
	private String specialization;
	private String licenseNumber;
}

