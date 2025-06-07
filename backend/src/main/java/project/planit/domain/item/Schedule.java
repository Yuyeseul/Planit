package project.planit.domain.item;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Schedule {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private LocalDate date;
    private String description;

    @OneToMany(mappedBy = "schedule")
    private List<Map> maps;

    @OneToOne(mappedBy = "schedule")
    private Budget budget;
}
