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
    @GeneratedValue
    private String id;
    private String username;
    private String password;
    private String nickname;
    private String phone;
    private String email;
    private String profile_image;

    @OneToMany(mappedBy = "member")
    private List<Plan> plans = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Friend> friends = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<CheckList> checklist = new ArrayList<>();
}
