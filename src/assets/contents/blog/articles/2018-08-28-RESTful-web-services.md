---
layout: post
title:  "RESTful web services explained"
date:   2018-08-27 12:18:01 +0200
categories: 
    - architecture 
    - java
tags: 
    - java
    - spring
    - unit test
    - rest
author: newlight77
---

Nowadways, most of backend services provides REST APIs for client such as frontend applications to consume. Therefore, it is very important to understand what it defines and how to implement RESTful web services or to consume them properly and more effiently.

## Definition

**RE**presentation **S**tate **T**ransfer is not a protocol, nor a format, but an architecture style, a convention or an approach to construct web services, on top of HTTP. It is used to develop **R**esources **O**riented **A**pplication. Applications that are complied with this architecture is said RESTful.

## Theory

### Constrains

- **Client-server**

  The separation of concerns enables independent evolution of the Client and the Server.

- **Stateless**

  The communication between Client and Server must be stateless between requests. Each request from a client should contain all the necessary information for the service to complete the request. all session state data should then be returned to the client at the end of each request.

- **Cache**

  All responses from the Server should be explicitly labeled as cacheable or non-cacheable.

- **Interface / Uniform Contract**

  The Service and all Clients must share a single uniform technical interface.

- **Layered System**

  Allow for Intermediaries / Middleware.

### Terminology

- **Resource**

  The Resource is the key abstraction of information in REST.
  Any information that can be named / identified via a unique, global id (the URI) - is a Resource.

- **Representation**

  Any given Resource can have multiple Representations; these capture the current state of the Resource in a specific format.

  At the lowest level, the Representation is "a sequence of bytes, plus representation metadata to describe these bytes".

- **Hypermedia Types**

  There are several Hypermedia types we can use for our Representations, and we can build our own if we need to. Note that JSON is not a Hypermedia.


## Principles

RESTful by the practices explained based on principles.


- **Resources are identified by URI**

  Every resource is identified by a unique identifier.

- **Uniform interface**, use HTTP verbs for CRUD operations on resources

  Use common set of verbs : GET, PUT, POST, DELETE, PATCH.

- **Response represents resource** (json, xml)

  Response is the representation of the resource.

- **Links to other resources**

  Within response, there are links to other resources (links, next, last, otherResource).

- **Stateless services**

  So the server does not maintain the states of the clients. This means that you cannot use server session storage and you have to authenticate every request. Don't confuse session storage and persistence into database.

  Each request from a client should contain all the necessary information for the service to complete the request. All session state data should then be returned to the client at the end of each request.

- **Cacheable**, if you can

  So you don't have to serve the same requests again and again

- **Layered system**

  To increase scalability, the REST system is composed of hierarchical layers. Each layer contains components which use the services of components which are in the next layer below. So you can add new layers and components effortless. Intermediary components or middleware must be transparent and independent.

## CRUD

- **CREATE** : post
- **Retrieve** : get
- **Update** : puts
- **Delete** : delete

## FAQ

- Read with a post? 

  E.g. : Search with complex criteria

  Could you use a GET request instead of a PUT or DELETE or POST? Sure, but following standards makes intent explicit. Refer to the [RFC-626](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)

  The HTTP standard describes the ways that the different requests (GET, POST, PUT, DELETE, HEAD) are intended to be used. For a GET request, all of the data is carried in the URL, which has a length limitation and is also visible to the user. A POST request allows you to send a payload.

- Trigger an action on server side with a GET? 

  E.g. : Triggering a batch or a notification

- Update with delete, or Delete with put?

  Same answer above. following standards makes intent explicit.

## WADL

**W**eb **A**pplication **D**escription **L**anguage is a W3C standard and descrbie services (resource, method, parameters and response). It allows to interact dynamically with Restful applications.****

## Sample

Non RESTful APIs:

```
GET /delete_user.x?id=123
GET /user/delete
GET /new_user.x
GET /user/new
GET /user?id=1
GET /user/id/1
GET /get/user/by/profile/id
GET /get/postalcode/by/city&city=paris
```

RESTful APIs:

```
GET /user/2
DELETE /user/2
PUT /user
GET /postalCode?city=paris
```

UserController.java

```java
package com.newlight77.admin.controller;

import com.newlight77.admin.model.UserDto;
import com.newlight77.admin.service.UserService;
import com.newlight77.right.aspect.Rights;
import com.newlight77.right.model.Right;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping(value = "")
  public UserDto create(
          @RequestHeader String token,
          @RequestBody UserDto user) {
    return userService.save(user);
  }

  @PutMapping(value = "/{id}")
  public UserDto updateById(
          @RequestHeader String token,
          @PathVariable String id,
          @RequestBody UserDto user) {
    return userService.save(user);
  }

  @DeleteMapping(value = "/{id}")
  public Long deleteById(@RequestHeader String token,
                         @PathVariable String id) {
    return userService.deleteByUsername(username);
  }

  @GetMapping(value = "", params = {"username"})
  public Collection<UserDto> findByUsername(@RequestHeader String token,
                                            @RequestParam String username) {
    return userService.findByUsername(username);
  }

  @GetMapping(value = "", params = {"firstname", "lastname"})
  public Collection<UserDto> find(@RequestHeader String token,
                                  @RequestParam String firstname,
                                  @RequestParam String lastname) {
    return userService.find(firstname, lastname);
  }

  @GetMapping(value = "")
  public Collection<UserDto> findAll(@RequestHeader String token) {
    return userService.findAll();
  }
}
```
