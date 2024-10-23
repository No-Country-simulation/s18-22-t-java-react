package policonsultorio.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import policonsultorio.demo.dto.clinic.ResponseClinic;

@Entity(name = "Clinic")
@Table(name = "clinic")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(of = "id")
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
    private Long id;
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "cuit", nullable = false, unique = true)
    private String cuit;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "phone", nullable = false)
    private String phone;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "vlinic_image", columnDefinition = "TEXT")
    private String vlinicImage;


    public Clinic(ResponseClinic responseClinic) {
        this.name = responseClinic.name();
        this.cuit = responseClinic.cuit();
        this.address = responseClinic.address();
        this.phone = responseClinic.phone();
        this.description = responseClinic.description();
        this.vlinicImage = responseClinic.vlinicImage();
    }
}
