package policonsultorio.demo.dto;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.enums.Roles;

public record LoginRequestDTO(
        Long id,
        @NotBlank
        String name,
        @NotBlank
        String dni,
        @NotBlank
        String obraSocial,
        @NotBlank
        String numeroAsociado,
        @NotBlank
        String password,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String phone,
        String img,
        Boolean active,
        Roles rol
) {
    public LoginRequestDTO(User usuario) {
        this(usuario.getId(), usuario.getName(), usuario.getDni(), usuario.getObraSocial(),
                usuario.getNumeroAsociado(), usuario.getPassword(), usuario.getEmail(), usuario.getPhone(),
                usuario.getImg(), usuario.getActive(),usuario.getRol());
    }

    public LoginRequestDTO(Long id) {
        this(id, null, null, null, null, null, null, null, null, null,null);
    }


}
