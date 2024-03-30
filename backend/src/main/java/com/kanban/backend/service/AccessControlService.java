package com.kanban.backend.service;

import com.kanban.backend.dto.AccessControlRequest;
import com.kanban.backend.dto.AccessControlResponse;
import com.kanban.backend.entity.AccessControl;
import com.kanban.backend.repository.AccessControlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccessControlService {

    private final AccessControlRepository accessControlRepository;

    public String createAccessControl(AccessControlRequest request) {
        AccessControl accessControl = AccessControl.builder()
                .empid(request.getEmpid())
                .username(request.getUsername())
                .company(request.getCompany())
                .ccode(request.getCcode())
                .owner(request.getOwner())
                .updateaccess(request.isUpdateaccess())
                .deleteaccess(request.isDeleteaccess())
                .createaccess(request.isCreateaccess())
                .build();

        accessControlRepository.save(accessControl);
        return "AccessControl Created";
    }

    public List<AccessControlResponse> getAllAccessControls() {
        List<AccessControl> accessControls = accessControlRepository.findAll();
        return accessControls.stream()
                .map(this::mapToAccessControlResponse)
                .collect(Collectors.toList());
    }
    
    
    public List<AccessControl> getAccessControlByOwner(String owner) {
        return accessControlRepository.findByOwner(owner);
    }

    
    public Object getAccessControlById(int id) {
        Optional<AccessControl> optionalAccessControl = accessControlRepository.findById(id);
        if (optionalAccessControl.isPresent()) {
            return optionalAccessControl.get();
        } else {
            return "AccessControl Not Found";
        }
    }


    public String updateAccessControl(int id, AccessControlRequest request) {
        Optional<AccessControl> optionalAccessControl = accessControlRepository.findById(id);
        if (optionalAccessControl.isPresent()) {
            AccessControl existingAccessControl = optionalAccessControl.get();
            existingAccessControl.setEmpid(request.getEmpid());
            existingAccessControl.setUsername(request.getUsername());
            existingAccessControl.setCompany(request.getCompany());
            existingAccessControl.setCcode(request.getCcode());
            existingAccessControl.setOwner(request.getOwner());
            existingAccessControl.setUpdateaccess(request.isUpdateaccess());
            existingAccessControl.setDeleteaccess(request.isDeleteaccess());
            existingAccessControl.setCreateaccess(request.isCreateaccess());
            accessControlRepository.save(existingAccessControl);
            return "AccessControl Updated";
        } else {
            return "AccessControl Not Found";
        }
    }

    public String deleteAccessControl(int id) {
        Optional<AccessControl> accessControlOptional = accessControlRepository.findById(id);
        if (accessControlOptional.isPresent()) {
            accessControlRepository.deleteById(id);
            return "AccessControl deleted successfully";
        } else {
            return "AccessControl not found";
        }
    }

    private AccessControlResponse mapToAccessControlResponse(AccessControl accessControl) {
        return AccessControlResponse.builder()
                .id(accessControl.getId())
                .empid(accessControl.getEmpid())
                .username(accessControl.getUsername())
                .company(accessControl.getCompany())
                .ccode(accessControl.getCcode())
                .owner(accessControl.getOwner())
                .updateaccess(accessControl.isUpdateaccess())
                .deleteaccess(accessControl.isDeleteaccess())
                .createaccess(accessControl.isCreateaccess())
                .build();
    }
}
