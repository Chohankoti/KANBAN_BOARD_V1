package com.kanban.backend.controller;

import com.kanban.backend.dto.AccessControlRequest;
import com.kanban.backend.dto.AccessControlResponse;
import com.kanban.backend.entity.AccessControl;
import com.kanban.backend.service.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accesscontrols")
@CrossOrigin("*")
public class AccessControlController {

    private final AccessControlService accessControlService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createAccessControl(@RequestBody AccessControlRequest request) {
        return accessControlService.createAccessControl(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AccessControlResponse> getAllAccessControls() {
        return accessControlService.getAllAccessControls();
    }
    
       
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Object getAccessControlById(@PathVariable int id) {
        return accessControlService.getAccessControlById(id);
    }
    
    @GetMapping("/filterbyowner/{owner}")
    @ResponseStatus(HttpStatus.OK)
    public List<AccessControl> getAccessControlByOwner(@PathVariable String owner) {
        return accessControlService.getAccessControlByOwner(owner);
    }
    
    @GetMapping("/filterbyusername/{username}")
    @ResponseStatus(HttpStatus.OK)
    public List<AccessControl> getByUsernameAccessControls(@PathVariable String username) {
        return accessControlService.getByUsernameAccessControls(username);
    }
    
    @GetMapping("/getdistinctownersbyusername/{username}")
    @ResponseStatus(HttpStatus.OK)
    public  List<Map<String, String>> getDistinctByUsernameAccessControls(@PathVariable String username) {
        return accessControlService.getDistinctOwnersByUsername(username);
    }
    
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String updateAccessControl(@PathVariable int id, @RequestBody AccessControlRequest request) {
        return accessControlService.updateAccessControl(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteAccessControl(@PathVariable int id) {
        return accessControlService.deleteAccessControl(id);
    }
}
