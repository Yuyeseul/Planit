package project.planit.domain.item;

import jakarta.persistence.*;

@Entity
public class Budget {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    private int amount;
    private String type;
}