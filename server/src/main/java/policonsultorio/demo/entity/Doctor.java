package policonsultorio.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import policonsultorio.demo.enums.Roles;

import java.util.List;

@Getter
@Setter
@Table(name = "doctor")
@SQLDelete(sql = "UPDATE doctor SET deleted=true WHERE id = ?")
@Where(clause = "deleted = false")
@Entity
public class Doctor extends User {
	private String specialization;
	private String licenseNumber;
	private Boolean deleted  = false;
	@ManyToOne
	@JoinColumn(name = "clinic_id") // Columna que referencia a Clinic
	@JsonIgnore
	private Clinic clinic;
//	private List<WorkingHous> workingHousList = new List<WorkingHous>();
//  private List<Appointments> appointmentsList = new List<Appointments>();
}