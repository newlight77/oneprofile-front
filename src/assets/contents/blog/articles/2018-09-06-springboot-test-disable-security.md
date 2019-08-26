---
layout: post
title:  "How to test endpoints with Springboot by disabling security"
date:   2018-09-06 18:48:01 +0200
categories: 
    - security
    - java
tags: 
    - java
    - spring security
    - unit test
    - annotation
    - aspect
author: newlight77
---

This article aims to show how to write tests when using springboot with security embedded.

## Application Code

application.yml :

```yaml
server:
  port: 9080
```

bootstrap.yml

```yaml
spring:
  application:
    name: user-app
```

Application.java

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

UserController.java:

```java
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping(value = "")
    public UserDto create(
            @RequestHeader String primary,
            @RequestBody UserDto user) {
      return userService.save(user);
    }
}
```

UserService.java

```java
@Service
public class UserService {
    public UserDto save(UserDto user) {
        return user;
    }
}
```

UserDto.java

```java
public class UserDto {
  private String firstname;
  private String lastname;
  private String username;
}
```


WebSecurityConfig.java

```java
@Configuration
@EnableWebSecurity
@Profile(value = {"development", "production"})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

}
```

## Test code

Add this annotation to apply the active profile :

```java
@ActiveProfiles(value = "test")
```

UserControllerIntegrationTest.java

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
    SocleApplication.class,
    MicroAppSecurityConfiguration.class,
},
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerIntegrationTest {
    @Value("${local.server.port}")
    private int serverPort;

    @MockBean
    private PointRaccordementService service;

    @Before
    public void setUp() {
        RestAssured.port = serverPort;
    }

    @Test
    public void shouldReturnSuccessResult_whenPostingDemande() {
        UserDto user = new UserDto();
        user.setUsername("username");
        Mockito.when(service.save(Mockito.any(UserDto.class))).thenReturn(user);

        RestAssured
            .given()
                .body(user)
                .contentType(ContentType.JSON)
            .when()
                .post("/users")
            .then()
                .statusCode(HttpStatus.OK.value())
                .body("username", Matchers.equalTo("username"))
                ;

    }
}
```

### Security enable/disable

Don't forget to disable security.

application-test.yml

```yaml
server:
  port: 9080

security:
  basic:
    enabled: false
```

Your application is likely annotated with @SpringBootApplication (this with @EnableAutoConfiguration), and this will load Spring Security via auto-configuration.

Have a look at [autoconfig endpoint](http://localhost:8080/autoconfig) to see what's being auto-configured.
