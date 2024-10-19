package policonsultorio.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.enums.Roles;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity(name = "User")
@Table(name = "user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
    private Long id;
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
    @Column(name = "initial_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate initialDate = LocalDate.now();
    @Column(name = "rol")
    @Enumerated(EnumType.STRING)
    private Roles rol = Roles.PATIENT;
    @Column(name = "active", columnDefinition = "boolean default true")
    private Boolean active = true;
    @OneToOne(mappedBy = "userId")
    private Authorizarion authorizarion;


    public User(LoginRequestDTO loginRequestDto) {
        this.id = loginRequestDto.id();
        this.name = loginRequestDto.name();
        this.password = loginRequestDto.password();
        this.email = loginRequestDto.email();
        this.phone = loginRequestDto.phone();
        this.img = loginRequestDto.img();
        this.active = loginRequestDto.active();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
