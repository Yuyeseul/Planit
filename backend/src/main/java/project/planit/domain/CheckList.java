package project.planit.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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