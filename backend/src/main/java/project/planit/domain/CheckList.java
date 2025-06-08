package project.planit.domain;

import jakarta.persistence.*;

@Entity
public class CheckList {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private boolean checked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}