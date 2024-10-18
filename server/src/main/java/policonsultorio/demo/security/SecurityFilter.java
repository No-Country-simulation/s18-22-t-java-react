package policonsultorio.demo.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
import policonsultorio.demo.service.UserService;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorizationRepository authorizationRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        {
//refactor
            HttpServletRequestWrapper2 wrappedRequest = new HttpServletRequestWrapper2(request);

            String body = wrappedRequest.getBody();
            Long userId = null;
            if (body != null && !body.isEmpty()) {
                // Parse the body to extract the user ID
                JSONObject jsonObject = new JSONObject(body);

                if (jsonObject.has("id"))  userId = Long.valueOf(jsonObject.getString("Id"));


                Optional<User> userDb = userRepository.findById(userId);
                User user = userDb.get();
                if (user != null) {
                    var authorization = authorizationRepository.findByUserId(user.getId());
                    var token = authorization.getJwt();
                    var nombreUsuario = tokenService.getSubject(token);

                    if (nombreUsuario != null) {
                        UserDetails usuario = userRepository.findByNameUserDetails(nombreUsuario);
                        var authentication = new UsernamePasswordAuthenticationToken(usuario, null,
                                usuario.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
            filterChain.doFilter(request, response);
        }
    }
}
