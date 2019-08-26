---
layout: post
title:  "RESTful json-patch by example"
date:   2018-08-28 12:18:01 +0200
categories: 
    - architecture
    - java
tags: 
    - java
    - spring
    - rest
author: newlight77
---

JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed. 

When used in combination with the HTTP PATCH method, it allows partial updates for via APIs in a standards compliant way.

The patch documents are themselves JSON documents.

JSON Patch is specified in [RFC 6902](http://tools.ietf.org/html/rfc5789) from the IETF.

## Simple Example

The original document

```json
{
  "username": "uncle",
  "firstname": "kong",
  "lastname": "to"
}
```

The patch

```json
[
  { "op": "replace", "path": "/username", "value": "donkey" },
  { "op": "add", "path": "/roles", "value": ["admin", "user"] },
  { "op": "replace", "path": "/roles/0/name", "value": "guest" }
  { "op": "add", "path": "/age", "value": 25 }
  { "op": "remove", "path": "/firstname" }
]
```

The result

```json
{
  "username": "donkey",
  "lastname": "to",
  "age": 25,
  "roles": ["guest", "user"]
}
```

## Java Sample

Maven dependency:

```xml
<dependency>
    <groupId>com.github.fge</groupId>
    <artifactId>json-patch</artifactId>
    <version>1.9</version>
</dependency>
```

RESTful APIs:

```
POST /user
GET /user/2
DELETE /user/2
PUT /user/2
---------------
PATCH /user/2
```

UserController.java

```java
package com.newlight77.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.JsonPatchOperation;
import com.newlight77.demo.model.UserDto;
import com.newlight77.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.IllegalFormatException;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping(value = "")
  public UserDto create(
          @RequestBody UserDto user) {
    return userService.save(user);
  }

  @PutMapping(value = "/{id}")
  public void updateById(@PathVariable String id, @RequestBody UserDto user) {
    userService.updateById(id, user);
  }

  @PatchMapping(value = "/{id}")
  public void patch(@PathVariable String id, @RequestBody List<JsonPatchOperation> operations) {
    this.userService.patch(id, operations);
  }

  @PatchMapping(value = "/{id}")
  public void patchById(@PathVariable String id, @RequestBody JsonPatch jsonPatch) {
    this.userService.patchById(id, jsonPatch);
  }

  @DeleteMapping(value = "/{id}")
  public void deleteById(@PathVariable String id) {
    userService.deleteById(id);
  }

  @GetMapping(value = "", params = {"username"})
  public Collection<UserDto> findByUsername(@RequestParam String username) {
    return userService.findByUsername(username);
  }

  @GetMapping(value = "")
  public Collection<UserDto> findAll() {
    return userService.findAll();
  }
}
```

```java
package com.newlight77.demo.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.JsonPatchOperation;
import com.newlight77.demo.entity.UserEntity;
import com.newlight77.demo.mapper.UserMapper;
import com.newlight77.demo.model.UserDto;
import com.newlight77.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
public class UserService {
    private UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto save(UserDto user) {
        UserEntity entity = UserMapper.from(user);
        return UserMapper.to(userRepository.save(entity));
    }

    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public void updateById(String id, UserDto userDto) {
        Optional<UserEntity> entity = userRepository.findById(id);
        entity.ifPresent(u -> {
            BeanUtils.copyProperties(UserMapper.from(userDto), u);
            userRepository.save(u);
        });
    }

    public void patch(String id, List<JsonPatchOperation> operations) {
        this.findById(id)
            .ifPresent(existing -> {
                ObjectMapper objectMapper = new ObjectMapper();
                operations.stream().forEach(op -> {
                    try {
                        JsonNode node = objectMapper.readValue(op.toString(), JsonNode.class);
                        // allow only add operation
                        if ("add".equals(node.get("op"))) {
                            JsonNode patched = op.apply(objectMapper.convertValue(existing, JsonNode.class));
                            UserDto patchedUser = objectMapper.treeToValue(patched, UserDto.class);
                            this.updateById(id, patchedUser);
                        }
                    } catch (IOException | JsonPatchException e) {
                        throw new IllegalStateException();
                    }
                });
            });
    }

    public void patchById(String id, JsonPatch jsonPatch) {
        this.findById(id)
            .ifPresent(existing -> {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode patched = jsonPatch.apply(objectMapper.convertValue(existing, JsonNode.class));
                    UserDto patchedUser = objectMapper.treeToValue(patched, UserDto.class);
                    this.updateById(id, patchedUser);
                } catch (JsonPatchException | JsonProcessingException e) {
                    throw new IllegalStateException();
                }
            });
    }

    public Optional<UserDto> findById(String id) {
        log.info("findById with id={}", id);
        return userRepository.findById(id)
                .map(UserMapper::to);
    }

    public List<UserDto> findByUsername(String username) {
        log.info("findByUsername with username={}", username);
        return userRepository.findByUsername(username)
                .stream()
                .map(UserMapper::to)
                .collect(Collectors.toList());
    }

    public List<UserDto> findAll() {
        Iterable<UserEntity> users = userRepository.findAll();
        return StreamSupport.stream(users.spliterator(), false)
                .map(UserMapper::to)
                .collect(Collectors.toList());
    }
}

```
