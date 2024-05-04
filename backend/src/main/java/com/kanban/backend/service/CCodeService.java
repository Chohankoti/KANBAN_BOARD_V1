package com.kanban.backend.service;

import com.kanban.backend.dto.CCodeRequest;
import com.kanban.backend.dto.CCodeResponse;
import com.kanban.backend.entity.CCode;
import com.kanban.backend.repository.CCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CCodeService {

    private final CCodeRepository ccodeRepository;

    public String createCCode(CCodeRequest ccodeRequest) {
        Optional<CCode> existingCCode = ccodeRepository.findByCcode(ccodeRequest.getCcode());
        if (existingCCode.isPresent()) {
            return "Community code already exists";
        } else {
            CCode ccode = CCode.builder()
                    .ccode(ccodeRequest.getCcode())
                    .tag(ccodeRequest.getTag())
                    .owner(ccodeRequest.getOwner())
                    .build();

            ccodeRepository.save(ccode);
            return "Community code created successfully";
        }
    }


    public List<CCodeResponse> getAllCCodes() {
        List<CCode> ccodes = ccodeRepository.findAll();
        return ccodes.stream().map(this::mapToCCodeResponse).toList();
    }

    private CCodeResponse mapToCCodeResponse(CCode ccode) {
        return CCodeResponse.builder()
                .id(ccode.getId())
                .ccode(ccode.getCcode())
                .tag(ccode.getTag())
                .owner(ccode.getOwner())
                .build();
    }

    public Object getCCodeById(long ccodeId) {
        Optional<CCode> optionalCCode = ccodeRepository.findByCcode(ccodeId);
        if (optionalCCode.isPresent()) {
            return optionalCCode.get();
        } else {
            return "CCode Not Found";
        }
    }
    
    public List<CCode> getCCodeByOwner(String Owner) {
        return ccodeRepository.findByOwner(Owner);
    }

    public String updateCCode(int ccodeId, CCode updatedCCode) {
        Optional<CCode> optionalCCode = ccodeRepository.findById(ccodeId);
        if (optionalCCode.isPresent()) {
            CCode existingCCode = optionalCCode.get();
            existingCCode.setCcode(updatedCCode.getCcode());
            existingCCode.setTag(updatedCCode.getTag());
            existingCCode.setOwner(updatedCCode.getOwner());
            ccodeRepository.save(existingCCode);
            return "Community Code Updated";
        } else {
            return "CCode Not Found";
        }
    }

    public String deleteCCode(int ccodeId) {
        Optional<CCode> ccodeOptional = ccodeRepository.findById(ccodeId);
        if (ccodeOptional.isPresent()) {
            ccodeRepository.deleteById(ccodeId);
            return "Community Code deleted successfully";
        } else {
            return "CCode not found";
        }
    }
}
