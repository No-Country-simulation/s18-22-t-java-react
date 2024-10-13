package policonsultorio.demo.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Doctor extends User {
	private String specialization;
	private String licenseNumber;
}