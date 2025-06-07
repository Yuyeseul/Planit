package project.planit.domain.item;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Plan {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private LocalDate start_date;
    private LocalDate end_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "plan")
    private List<Friend> friends;

    @OneToMany(mappedBy = "plan")
    private List<Schedule> schedules = new ArrayList<>();
}

