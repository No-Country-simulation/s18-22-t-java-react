package policonsultorio.demo.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Doctor extends User {
	private String specialization;
	private String licenseNumber;
//	private List<WorkingHous> workingHousList = new List<WorkingHous>();
//  private List<Appointments> appointmentsList = new List<Appointments>();
}