package policonsultorio.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity(name = "Authorizarion")
@Table(name = "authorization")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Authorizarion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id ;


    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;
    @Column(name = "jwt", nullable = false)
    private String jwt;



}
