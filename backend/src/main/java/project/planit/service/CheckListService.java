package project.planit.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.CheckList;
import project.planit.domain.Member;
import project.planit.repository.CheckListRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckListService {

    private final CheckListRepository checkListRepository;

    public CheckListService(CheckListRepository checkListRepository) {
        this.checkListRepository = checkListRepository;
    }

    // checklist 생성
    public CheckList addCheckList(Member member, String name) {
        CheckList checkList = new CheckList();
        checkList.setName(name);
        checkList.setChecked(false);
        checkList.setMember(member);
        return checkListRepository.save(checkList);
    }

    // checklist 수정
    public Optional<CheckList> updateCheckList(Long id, String name, Boolean checked) {
        Optional<CheckList> optionalCheckList = checkListRepository.findById(id);
        optionalCheckList.ifPresent(checkList -> {
            if (name != null) checkList.setName(name);
            if (checked != null) checkList.setChecked(checked);
        });
        return optionalCheckList;
    }

    // checklist 삭제
    public void deleteCheckList(Long id) {
        checkListRepository.deleteById(id);
    }

    // checklist 조회
    @Transactional(readOnly = true)
    public List<CheckList> findByMemberId(String memberId) {
        return checkListRepository.findByMemberId(memberId);
    }

    // checklist 단건 조회
    @Transactional(readOnly = true)
    public Optional<CheckList> findById(Long id) {
        return checkListRepository.findById(id);
    }
}
