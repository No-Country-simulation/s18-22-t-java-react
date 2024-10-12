package policonsultorio.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import policonsultorio.demo.dto.LoginRequestDTO;

@Entity(name = "User")
@Table(name = "user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
    private Long id ;
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone", nullable = false)
    private String phone;
    @Column(name = "img")
    private String img;
   // @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
   // @JoinColumn(name = "authorizarion_id", referencedColumnName = "id")
   @OneToOne(mappedBy = "userId")
    private Authorizarion authorizarion;


    public User(LoginRequestDTO loginRequestDto) {
        this.name = loginRequestDto.name();
        this.password = loginRequestDto.password();
        this.email = loginRequestDto.email();
        this.phone = loginRequestDto.phone();
        this.img = loginRequestDto.img();
    }
}
