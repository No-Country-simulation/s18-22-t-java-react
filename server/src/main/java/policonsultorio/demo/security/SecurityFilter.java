package policonsultorio.demo.security;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.AuthorizationRepository;
import policonsultorio.demo.repository.UserRepository;
import java.io.IOException;
import java.util.Optional;
import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
import policonsultorio.demo.service.UserService;

@Slf4j
@Component
public class SecurityFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorizationRepository authorizationRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            HttpServletRequestWrapper2 wrappedRequest = new HttpServletRequestWrapper2(request);
            String body = wrappedRequest.getBody();
            Long userId = null;

            if (body != null && !body.isEmpty()) {
                logger.info("Request body: {}", body);  // Log del cuerpo de la solicitud

                // Parse the body to extract the user ID
                JSONObject jsonObject = new JSONObject(body);
                if (jsonObject.has("id")) {
                    userId = Long.valueOf(jsonObject.getString("id"));
                    logger.info("Extracted userId: {}", userId);  // Log del userId extraído

                    Optional<User> userDb = userRepository.findById(userId);
                    if (userDb.isPresent()) {
                        User user = userDb.get();
                        var authorization = authorizationRepository.findByUserId(user.getId());
                        var token = authorization.getJwt();
                        var emaiUsuario = tokenService.getSubject(token);

                        if (emaiUsuario != null) {
                            logger.info("Token subject (username): {}", emaiUsuario);  // Log del nombre de usuario del token
                            UserDetails usuario =  userService.findByEmail(emaiUsuario);
                            if(usuario == null) throw new EntityNotFoundException("userDetails is null");
                            var authentication = new UsernamePasswordAuthenticationToken(user, null, usuario.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            logger.info("User authenticated: {}", usuario.getUsername());  // Log del usuario autenticado
                        }
                    } else {
                        logger.warn("User not found with userId: {}", userId);  // Log de advertencia si el usuario no se encuentra
                    }
                } else {
                    logger.warn("Request body does not contain 'id' field.");  // Log de advertencia si 'id' no está presente
                }
            } else {
                logger.warn("Request body is empty.");  // Log de advertencia si el cuerpo de la solicitud está vacío
            }
         
            filterChain.doFilter(wrappedRequest, response);
        } catch (IOException ex) {
            logger.error("I/O error while reading input message: {}", ex.getMessage());  // Log de errores de I/O
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request body");
        } catch (Exception ex) {
            logger.error("Error processing request: {}", ex.getMessage());  // Log de otros errores
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request");
        }
    }
}
