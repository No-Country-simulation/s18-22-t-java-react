package policonsultorio.demo.dto;

import jakarta.validation.constraints.NotBlank;
import policonsultorio.demo.entity.User;

public record LoginRequestDTO(
        Long id,
        @NotBlank
        String name,
        @NotBlank
        String password,
        @NotBlank
        String email,
        @NotBlank
        String phone,
        String img,
        Boolean active
) {
        public LoginRequestDTO(User usuario) {
                this(usuario.getId(), usuario.getName(), usuario.getPassword(), usuario.getEmail(), usuario.getPhone(), usuario.getImg(),usuario.getActive());
        }
}
