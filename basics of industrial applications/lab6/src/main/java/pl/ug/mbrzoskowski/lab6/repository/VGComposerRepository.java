package pl.ug.mbrzoskowski.lab6.repository;

import pl.ug.mbrzoskowski.lab6.domain.VGComposer;

import java.util.Optional;

public class VGComposerRepository {

    public VGComposer findById(Long id) {

        if (id == 50L) {
            return new VGComposer("Christopher Larkin", 50L);
        }

        return null;
    }

    public Optional<VGComposer> getById(Long id) {

        if (id == 50L) {
            return Optional.of(new VGComposer("Christopher Larkin", 50L));
        }

        return Optional.empty();
    }

}
