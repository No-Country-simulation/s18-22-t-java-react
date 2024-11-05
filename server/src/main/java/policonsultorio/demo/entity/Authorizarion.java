package policonsultorio.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User userId;
    @Column(name = "jwt", nullable = false)
    private String jwt;

    @Override
    public String toString() {
        return "User:{" +
                "id:" + getUserId().getId() +
                ", name:'" + getUserId().getName() + '\'' +
                ", password:'" + getUserId().getPassword() + '\'' +
                ", email:'" + getUserId().getEmail() + '\'' +
                ", phone:'" + getUserId().getPhone() + '\'' +
                ", img:'" + getUserId().getImg() + '\'' +
                ", initialDate:" + getUserId().getInitialDate() +
                ", rol:" + getUserId().getRol() +
                ", active" + getUserId().getActive() +
                '}';
    }

}
