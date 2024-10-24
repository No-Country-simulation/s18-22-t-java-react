package policonsultorio.demo.dto.clinic;


import policonsultorio.demo.entity.Clinic;

public record ResponseClinicUpdate(

        String name,

        String cuit,

        String address,

        String phone,

        String description,

        String vlinicImage,
        boolean active
        ) {
        public ResponseClinicUpdate(Clinic clinic) {
                this(clinic.getName(),clinic.getCuit(),clinic.getAddress(),clinic.getCuit(),clinic.getDescription(),clinic.getVlinicImage(), clinic.getActive());
        }
}
