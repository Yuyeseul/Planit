package project.planit.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id
    private String id;
    private String username;
    private String password;

    @Column(unique = true)
    private String nickname;

    @Column(unique = true)
    private String phone;

    @Column(unique = true)
    private String email;
    private String profileImage;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Plan> plans = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friend> friends = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CheckList> checklist = new ArrayList<>();
}
