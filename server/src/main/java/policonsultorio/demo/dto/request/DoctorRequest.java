package policonsultorio.demo.dto.request;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import policonsultorio.demo.entity.Authorizarion;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorRequest {
	@Column(name = "name", nullable = false, unique = true)
	private String name;
	@Column(name = "password", nullable = false)
	private String password;
//	@Column(name = "email", nullable = false)
	@Email
	private String email;
	@NotBlank
	private String dni;
	@NotBlank
	private String obraSocial;
	@NotBlank
	private String numeroAsociado;
	@Column(name = "phone", nullable = false)
	private String phone;
	@Column(name = "img")
	private String img;
	@Column(name = "active",columnDefinition = "boolean default true")
	private Boolean active = true;
	private String specialization;
	private String licenseNumber;
	private Long clinic_id;
}
