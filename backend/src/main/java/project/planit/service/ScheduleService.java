package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.domain.Schedule;
import project.planit.repository.PlanRepository;
import project.planit.repository.ScheduleRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final PlanRepository planRepository;

    @Transactional
    public void saveSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    // 일정 업데이트
    @Transactional
    public void updateSchedule(Schedule schedule) {
        Schedule findSchedule = scheduleRepository.findById(schedule.getId());
        if (findSchedule == null) {
            throw new IllegalArgumentException("존재하지 않는 일정입니다.");
        }

        findSchedule.update(
                schedule.getDescription(),
//                schedule.getBudget(),
                schedule.getMaps()
        );

        if (schedule.getMaps() != null) {
            findSchedule.getMaps().clear();  // 기존 데이터 초기화
            findSchedule.getMaps().addAll(schedule.getMaps());  // 새 데이터 등록
        }
    }

    // 일정 조회
    @Transactional(readOnly = true)
    public List<Schedule> findByPlan(Long planId) {
        Plan plan = planRepository.findById(planId);
        if (plan == null) {
            throw new IllegalArgumentException("해당 계획이 존재하지 않습니다.");
        }
        return scheduleRepository.findByPlan(plan);
    }
}
