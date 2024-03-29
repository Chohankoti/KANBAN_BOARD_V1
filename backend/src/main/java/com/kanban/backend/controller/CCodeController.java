package com.kanban.backend.controller;

import com.kanban.backend.dto.CCodeRequest;
import com.kanban.backend.dto.CCodeResponse;
import com.kanban.backend.entity.CCode;
import com.kanban.backend.service.CCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ccodes")
@CrossOrigin("*")
public class CCodeController {

    private final CCodeService ccodeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createCCode(@RequestBody CCodeRequest ccodeRequest) {
        return ccodeService.createCCode(ccodeRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CCodeResponse> getAllCCodes() {
        return ccodeService.getAllCCodes();
    }

    @GetMapping("/{ccodeId}")
    @ResponseStatus(HttpStatus.OK)
    public Object getCCodeById(@PathVariable int ccodeId) {
        return ccodeService.getCCodeById(ccodeId);
    }

    @PutMapping("/{ccodeId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateCCode(@PathVariable int ccodeId, @RequestBody CCode ccode) {
        return ccodeService.updateCCode(ccodeId, ccode);
    }

    @DeleteMapping("/{ccodeId}")
    public String deleteCCode(@PathVariable int ccodeId) {
        return ccodeService.deleteCCode(ccodeId);
    }

}
